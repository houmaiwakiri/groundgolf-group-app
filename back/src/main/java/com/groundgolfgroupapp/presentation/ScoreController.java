package com.groundgolfgroupapp.presentation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groundgolfgroupapp.application.ScoreService;
import com.groundgolfgroupapp.domain.model.Score;

@RestController
@RequestMapping("/scores")
public class ScoreController {

    private final ScoreService service;

    public ScoreController(ScoreService service) {
        this.service = service;
    }

    // POST /scores
    @PostMapping
    public Score register(@RequestBody List<Integer> strokes) {
        System.out.println("受け取った値: " + strokes);
        return service.registerScore(strokes);
    }

    // GET /scores
    @GetMapping
    public List<List<Integer>> list() {
        // DBから取得した Score を List<Integer> に変換して返す
        return service.getAllScores()
                      .stream()
                      .map(Score::getStrokesAsList)
                      .collect(Collectors.toList());
    }
}
