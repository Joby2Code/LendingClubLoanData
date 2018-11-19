variable "payload_path" {
  default = "lambda/package.zip"
}

variable "function_name" {
  default = "LendingLoanAnalysisService"
}

variable "function_description" {
  default = "Analysis the loan report"
}

variable "function_timeout" {
  default = 10
}

variable "handler" {
  default = "app/main.handler"
}
