from django.shortcuts import render
from .models import Patient, Counties, Facilities
from rest_framework import viewsets
from .serializers import PatientSerializer, CountySerializer, FacilitySerializer, CountyReadSerializer, FacilitySerializerReadOnly
from rest_framework.permissions import BasePermission,SAFE_METHODS

# Create your views here.

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class PatientsViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class CountiesViewSet(viewsets.ModelViewSet):
    serializer_class = CountySerializer
    queryset = Counties.objects.all()

class FacilityViewSet(viewsets.ModelViewSet):
    serializer_class = FacilitySerializer
    queryset = Facilities.objects.all()

class CountiesViewSetReadOnly(viewsets.ModelViewSet):
    serializer_class = CountyReadSerializer
    queryset = Counties.objects.all()
    permission_classes = [ReadOnly]

class FacilitiesViewsetReadOnly(viewsets.ModelViewSet):
    serializer_class = FacilitySerializerReadOnly
    queryset = Facilities.objects.all()
    permission_classes = [ReadOnly]
