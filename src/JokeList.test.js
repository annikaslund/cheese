import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import JokeList from "./JokeList";

// smoke test
xit("renders without crashing", function() {
    mount(<JokeList />);
});
  
// snapshot test
xit("matches snapshot", function() {
    let wrapper = mount(<JokeList />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});