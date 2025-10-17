package com.groundgolfgroupapp.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groundgolfgroupapp.entity.Score;
import com.groundgolfgroupapp.service.ScoreService;

@RestController
@RequestMapping("/scores")
public class ScoreController {

    private final ScoreService service;

    public ScoreController(ScoreService service) {
        this.service = service;
    }

    @PostMapping
    public Score register(@RequestBody List<Integer> strokes) {
        return service.registerScore(strokes);
    }

    @GetMapping
    public List<List<Integer>> list() {
        return service.getAllScores()
                .stream()
                .map(Score::getStrokes)
                .collect(Collectors.toList());
    }
}
