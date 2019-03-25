import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Joke from "./Joke";

// smoke test
it("renders without crashing", function() {
    mount(<Joke />);
});
  
  // snapshot test
it("matches snapshot", function() {
    let wrapper = mount(<Joke />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});