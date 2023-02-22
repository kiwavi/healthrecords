from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter
from .views import PatientsViewSet, FacilityViewSet, CountiesViewSet
from . import views


router = DefaultRouter()
router.register("patients", PatientsViewSet, basename="patients")
router.register("facilities", FacilityViewSet, basename="facilities")
router.register("counties", CountiesViewSet, basename="counties")

patients_urlpatterns = [
    re_path(r'^api/', include(router.urls)),
]
