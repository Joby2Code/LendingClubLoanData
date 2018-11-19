setup:
	rm -rf venv/
	virtualenv venv/ --no-site-packages
	venv/bin/pip install -r requirements.txt
run:
	. venv/bin/activate; python app/main.py

houston:
	. venv/bin/activate; nose2 -v

lambda_package: setup
	rm -rf package/ && mkdir -p package/ && mkdir -p storage/
	#cp -r venv/lib/python3.6/site-packages/* package/
	#cp -r venv/lib/python3.6/site-packages/numpy package/
	#cp -r /usr/local/Cellar/python3/3.6.2/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/pandas package/
	#cp -r lambda_packages/ package/
	#cp -r /usr/local/Cellar/python3/3.6.2/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/numpy package/
	#cp -r /usr/local/Cellar/python3/3.6.2/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/pytz package/
	#cp -r /Users/joby/Library/Python/3.6/lib/python/site-packages/smart_open package/
	cp -r app package/
	cp -r helpers/ package/
	cd package; zip -r package.zip . -x \*.git\* \*env\* *.zip
	mv package/package.zip infrastructure/lambda/
	cd infrastructure/ && terraform get
	@echo "Done building AWS Lambda package in infrastructure/lambda/package.zip"

deploy_test:
	cd infrastructure/ && terraform plan
deploy:
	cd infrastructure/ && terraform apply


