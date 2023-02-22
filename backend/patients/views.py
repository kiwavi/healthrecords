from django.shortcuts import render
from .models import Patient, Counties, Facilities
from rest_framework import viewsets
from .serializers import PatientSerializer, CountySerializer, FacilitySerializer

# Create your views here.

class PatientsViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class CountiesViewSet(viewsets.ModelViewSet):
    serializer_class = CountySerializer
    queryset = Counties.objects.all()

class FacilityViewSet(viewsets.ModelViewSet):
    serializer_class = FacilitySerializer
    queryset = Facilities.objects.all()
