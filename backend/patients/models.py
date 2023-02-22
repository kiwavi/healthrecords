from django.db import models

# Create your models here.

races = [
    ('White','WHITE'),
    ('Black','BLACK'),
    ('Asian/Pacific Islander','ASIAN/PACIFIC ISLANDER'),
    ('Unknown','UNKNOWN'),    
]

genders = [
    ('Male','Male'),
    ('Female','Female')
]

hispanic_status = [
    ('Yes','Yes'),
    ('No','No'),
    ('Unknown','Unknown')
]

class Patient(models.Model):
    first_name = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    county = models.ForeignKey("Counties",on_delete=models.CASCADE)
    street = models.CharField(max_length=60)
    date_of_birth = models.DateField()
    race = models.CharField(max_length=30,choices=races)
    sex = models.CharField(max_length=20,choices=genders)
    hispanic_or_latino = models.CharField(max_length=10,choices=hispanic_status)
    facility = models.ForeignKey("Facilities",on_delete=models.CASCADE)
    
    def __str__(self):
        return self.first_name

class Counties(models.Model):
    county_name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.county_name
    
class Facilities(models.Model):
    facility_name = models.CharField(max_length=70)
    county = models.ForeignKey("Counties",on_delete=models.CASCADE)    
    street = models.CharField(max_length=80)

    def __str__(self):
        return self.facility_name
