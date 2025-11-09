package app.nomitalk.service;

import app.nomitalk.model.Topic;
import app.nomitalk.repository.TopicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    public List<Topic> getTopicsByTheme(String theme) {
        return topicRepository.findByTheme(theme);
    }
}
