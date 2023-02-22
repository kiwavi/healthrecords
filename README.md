# healthrecords
## This projects record electronic health records into a database
### Setup     
#### Run the backend    
- cd backend     
- python -m venv venv   
- source venv/bin/activate    
- python manage.py makemigrations    
- python manage.py migrate    
- python manage.py runserver    
#### Run the frontend on a separate terminal    
- cd frontend    
- npm install    
- npm start    

Once you're done, head to the http://localhost:3000/add-patients     
