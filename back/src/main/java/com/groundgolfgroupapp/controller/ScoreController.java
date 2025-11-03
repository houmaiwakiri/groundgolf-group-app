package com.groundgolfgroupapp.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groundgolfgroupapp.dto.ScoreResponseDto;
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
    public List<ScoreResponseDto> list() {
        return service.getAllScores()
                .stream()
                .map(ScoreResponseDto::new) // ← DTOに変換
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
