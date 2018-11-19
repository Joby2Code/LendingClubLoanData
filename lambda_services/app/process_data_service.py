import boto3
import csv

# Initilaize the constant variables

LOAN_DATA_S3_BUCKET = "lending-loan-data-store";
LOAN_DATA_FILE_NAME = "loan_test.csv"
s3 = boto3.resource('s3')

fields = ('member_id', 'loan_amnt', 'funded_amnt', 'funded_amnt_inv', 'issue_d', 'grade')
bucket = LOAN_DATA_S3_BUCKET
file_name = LOAN_DATA_FILE_NAME

fileObject = s3.Object(bucket, file_name);
lines = fileObject.get()['Body'].read().decode().splitlines(True)


# ........Helper Functions ....

def _computeLoanAggregates(members, year=None):
    '''

    The helper function creates the loan aggegate metrics
    '''

    total_amnt_applied = 0
    total_amnt_funded = 0
    total_amnt_inv = 0
    group_by_grade_date = {}
    group_by_month = {}

    for i in range(1, len(members)):
        member = members[i];
        for key, member_attributes in member.items():
            for key, value in member_attributes.items():
                values= value.split('-')
                if key == 'issue_d' and len(values)==2 and (value.split('-')[1] == year or value.split('-')[1] == '20'+year):
                    if float(member_attributes['loan_amnt']) != None:
                        total_amnt_applied = total_amnt_applied + float(member_attributes['loan_amnt'])
                    if float(member_attributes['funded_amnt']) != None:
                        total_amnt_funded = total_amnt_funded + float(member_attributes['funded_amnt'])
                    if float(member_attributes['funded_amnt_inv']) != None:
                        total_amnt_inv = total_amnt_inv + float(member_attributes['funded_amnt_inv'])
                    if member_attributes['grade_issue_d'] != None:
                        if member_attributes['grade_issue_d'] in group_by_grade_date:
                            for key,grade in group_by_grade_date.items():
                                grade['amount'] = grade['amount']+float(member_attributes['loan_amnt'])
                                grade['count'] = grade['count']+1;
                        else:
                            temp = {}
                            temp['amount'] = float(member_attributes['loan_amnt'])
                            temp['count'] = 1;
                            temp['avg'] = None;
                            group_by_grade_date[member_attributes['grade_issue_d']]=temp

                    if member_attributes['issue_d'] != None:
                        if member_attributes['issue_d'] in group_by_month:
                            group_by_month[member_attributes['issue_d']] = group_by_month[member_attributes['issue_d']]+float(member_attributes['loan_amnt'])
                        else:
                           # temp = {}
                           # temp[member_attributes['issue_d']] = int(member_attributes['loan_amnt'])
                            group_by_month[member_attributes['issue_d']]=float(member_attributes['loan_amnt'])


    group_by_grade_date = _compute_loan_average(group_by_grade_date)
    result = {}
    result['total_amnt_applied'] = total_amnt_applied
    result['total_amnt_funded'] = total_amnt_funded
    result['total_amnt_inv'] = total_amnt_inv
    result['amount_by_grade'] = group_by_grade_date
    result['amount_by_month'] = group_by_month
    return result

def _compute_loan_average(loan_grade_dict):
    for grade, stats in loan_grade_dict.items():
        avg = int(stats['amount'])/int(stats['count'])
        stats['avg'] = float("{0:.2f}".format(avg))
    return loan_grade_dict

class ProcessData:
    field_map = {}
    field_col = set()

    def __init__(self):
        self.members = []
        csv_header = fileObject.get()['Body']._raw_stream.readline().decode().split(',')
        if len(self.field_map) == 0:
            for i in range(0, len(csv_header)):
                if str(csv_header[i]) in fields:
                    self.field_map[i] = csv_header[i]
                    self.field_col.add(i);
        else:
            pass

    def createMemberMap(self):
        counter = 0;
        fieldMap = self.field_map;
        field_col = self.field_col
        memberList = [];
        if len(memberList) == 0:
            for line in lines:
                datalist = line.split(',')
                member = {};
                details = {};

                for i in range(0, len(datalist)):
                    if i in field_col:
                        details[fieldMap.get(i)] = datalist[i]
                        if len(details) > 0:
                            member[datalist[1]] = details;
                if member != None:
                    for key,membr in member.items():
                        if membr != None and membr.get('grade') != None and membr.get('issue_d') != None:
                            membr['grade_issue_d'] = membr.get('grade')+'-'+membr.get('issue_d')
                    memberList.append(member);
                '''
                if counter > 10: break
                counter = counter + 1;
                '''

        self.members = memberList;

    def processLoanSummary(self, year=None):

        if year == None:
            error={}
            error['message'] = 'Invalid Year'
            return error

        members = self.members;
        return _computeLoanAggregates(members, year=year)

