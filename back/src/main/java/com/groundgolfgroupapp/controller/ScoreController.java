package com.groundgolfgroupapp.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;
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

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteScore(id);
    }

    @PutMapping("/{id}")
    public Score update(@PathVariable Long id, @RequestBody List<Integer> strokes) {
        return service.updateScore(id, strokes);
    }
}
