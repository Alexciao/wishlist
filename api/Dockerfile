# Use the official Python 3.11 image from Docker Hub
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install FastAPI and Uvicorn
RUN pip install --no-cache-dir fastapi uvicorn notion-client

# Expose the port FastAPI will run on
EXPOSE 9098

# Command to run the FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9098"]