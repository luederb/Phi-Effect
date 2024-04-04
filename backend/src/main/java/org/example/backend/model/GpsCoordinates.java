package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Locale;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GpsCoordinates {
    private double latitude;
    private double longitude;
    @Override
    public String toString() {
        Locale locale = Locale.ENGLISH;
        return "GpsCoordinates(latitude=" + String.format(locale, "%.4f", latitude) + ", longitude=" + String.format(locale, "%.4f", longitude) + ")";
    }
}
