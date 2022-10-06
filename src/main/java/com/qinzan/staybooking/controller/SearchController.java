package com.qinzan.staybooking.controller;

import com.qinzan.staybooking.exception.InvalidSearchDateException;
import com.qinzan.staybooking.model.Location;
import com.qinzan.staybooking.model.Stay;
import com.qinzan.staybooking.service.GeoCodingService;
import com.qinzan.staybooking.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class SearchController {
    private SearchService searchService;
    private GeoCodingService geoCodingService;

    @Autowired
    public SearchController(SearchService searchService, GeoCodingService geoCodingService) {
        this.searchService = searchService;
        this.geoCodingService = geoCodingService;
    }

    @GetMapping( "/search")
    public List<Stay> searchStays(
            @RequestParam(name = "guest_number") int guestNumber,
            @RequestParam(name = "checkin_date") String start,
            @RequestParam(name = "checkout_date") String end,
//            @RequestParam(name = "lat") double lat,
//            @RequestParam(name = "lon") double lon,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "distance", required = false) String distance) {
        LocalDate checkinDate = LocalDate.parse(start, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate checkoutDate = LocalDate.parse(end, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        Location location = geoCodingService.getLatLng(1L, address);

        if (checkinDate.equals(checkoutDate) || checkinDate.isAfter(checkoutDate) || checkinDate.isBefore(LocalDate.now())) {
            throw new InvalidSearchDateException("Invalid date for search");
        }
        return searchService.search(guestNumber, checkinDate, checkoutDate, location.getGeoPoint().getLat(), location.getGeoPoint().getLon(), distance);
    }
}