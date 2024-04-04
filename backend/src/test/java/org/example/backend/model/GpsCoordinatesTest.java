package org.example.backend.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GpsCoordinatesTest {

    @Test
    void testSetAndGetLatitude() {
        GpsCoordinates gpsCoordinates = new GpsCoordinates();
        gpsCoordinates.setLatitude(40.7128);
        assertEquals(40.7128, gpsCoordinates.getLatitude());
    }

    @Test
    void testSetAndGetLongitude() {
        GpsCoordinates gpsCoordinates = new GpsCoordinates();
        gpsCoordinates.setLongitude(74.0060);
        assertEquals(74.0060, gpsCoordinates.getLongitude());
    }
}