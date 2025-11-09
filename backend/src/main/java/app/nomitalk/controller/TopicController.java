package app.nomitalk.controller;

import app.nomitalk.model.Topic;
import app.nomitalk.service.TopicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "*")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping("/theme")
    public List<Topic> getByTheme(@RequestParam String theme) {
        return topicService.getTopicsByTheme(theme);
    }
}
