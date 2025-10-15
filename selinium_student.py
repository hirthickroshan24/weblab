from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Path to ChromeDriver
service = Service("C:/Users/kayal/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe")
driver = webdriver.Chrome(service=service)

# Open your local HTML file
driver.get("file:///D:/web%20tech%20lab/project/student.html")

# Wait until elements load
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "n")))

# Fill the form
driver.find_element(By.ID, "n").send_keys("roshan")
driver.find_element(By.ID, "a").send_keys("21")

# Submit the form
driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

# Wait 5 seconds so you can see the result before it closes
time.sleep(5)

# Close browser
driver.quit()
