from rest_framework import serializers
from .models import Facilities, Counties, Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = (
            'id',
            'first_name',
            'second_name',
            'last_name',
            'county',
            'street',
            'date_of_birth',
            'race',
            'sex',
            'hispanic_or_latino',
            'facility'
        )


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilities
        fields = (
            'id',
            'facility_name',
            'county',
            'street'
        )


class FacilitySerializerReadOnly(serializers.ModelSerializer):
    facility_name = serializers.StringRelatedField()
    class Meta:
        model = Facilities
        fields = (
            'id',
            'facility_name',
            'county',
            'street'
        )


class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = Counties
        fields = (
            'id',
            'county_name'
        )

class CountyReadSerializer(serializers.ModelSerializer):
    county_name = serializers.StringRelatedField()
    class Meta:
        model = Counties
        fields = (
            'id',
            'county_name'
        )
