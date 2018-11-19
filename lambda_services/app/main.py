
import logging
from app import process_data_service as data_service


# Setting log level

logger = logging.getLogger();
logger.setLevel(logging.INFO);


def handler(event, context):
    query = event['query']['year']
    #query = 2015
    year = str(query)
    year = year[2:]
    loan_service = data_service.ProcessData()
    loan_service.createMemberMap()
    response = loan_service.processLoanSummary(year)
    print(response)
    return response

#handler("","")