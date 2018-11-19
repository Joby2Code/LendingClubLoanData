# LendingClubLoanData
A reporting application that is developed using AWS services(Lambda, S3, API Gateway, Terraform). The application generates a loan summary from the LendingLoan dataset that can be downloaded from Kaggle @ https://www.kaggle.com/wendykan/lending-club-loan-data

The application is deployed on S3 bucket and can be accessed via-
http://lending-loan-dashboard.s3-website-us-east-1.amazonaws.com/

To test the application filter the date for 2011 or 2015 for graph display's as we have limited the amount of data downloaded 
from S3 due to Lambda restrictions.

