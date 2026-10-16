from selenium import webdriver

def before_scenario(context, scenario):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    
    context.driver = webdriver.Chrome(options=options)

def after_scenario(context, scenario):
    if hasattr(context, 'driver'):
        context.driver.quit()