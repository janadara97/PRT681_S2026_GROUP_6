# Test-suite image: only Python + dependencies, no browsers.
# All browsers live in the Selenium Grid node containers; the tests drive them via Remote WebDriver.
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/tests \
    SELENIUM_REMOTE_URL=http://selenium-hub:4444 \
    HEADLESS=true

WORKDIR /tests

# Install requirements first in their own layer, so changing test code reuses the Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY behave.ini ./
COPY pages ./pages
COPY features ./features
COPY scripts/run_tests.sh ./scripts/run_tests.sh
RUN chmod +x scripts/run_tests.sh

ENTRYPOINT ["./scripts/run_tests.sh"]
