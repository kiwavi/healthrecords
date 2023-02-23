# healthrecords
## This projects record electronic health records into a database
### Setup     
#### Run the backend    
#### Create a mysql database called 'health' and user 'ngrok' with password 'soulties12'.    
- `cd backend`     
- `python -m venv venv`   
- `source venv/bin/activate`    
- `pip install -r requirements.txt`    
- `python manage.py makemigrations`    `
- `python manage.py migrate`    
- `python manage.py runserver`    

#### The endpoint for adding counties is http://127.0.0.1:8000/api/counties/   
#### The endpoint for adding facilities is http://127.0.0.1:8000/api/facilities/    
#### Once you're done, head to the http://localhost:3000/add-patients and add patient entries    
#### Run the frontend on a separate terminal    
- `cd frontend`    
- `npm install`    
- `npm start`    

Once you're done, head to the http://localhost:3000/add-patients     
