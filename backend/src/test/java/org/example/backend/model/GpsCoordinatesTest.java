package org.example.backend.model;

import org.junit.jupiter.api.Test;

import static com.mongodb.internal.connection.tlschannel.util.Util.assertTrue;
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
    @Test
    void testEqualsAndHashCode() {
        GpsCoordinates gpsCoordinates1 = new GpsCoordinates(40.7128, 74.0060);
        GpsCoordinates gpsCoordinates2 = new GpsCoordinates(40.7128, 74.0060);

        assertTrue(gpsCoordinates1.equals(gpsCoordinates2) && gpsCoordinates2.equals(gpsCoordinates1));
        assertEquals(gpsCoordinates1.hashCode(), gpsCoordinates2.hashCode());
    }
}