/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import LoginForm from "./LoginForm.vue";

describe("LoginForm test", () => {
  it("should render", () => {
    const wrapper = mount(LoginForm);
    //has input for email
    expect(wrapper.find('input[type="email"]').exists()).toBeTruthy();
    //has input for password
    expect(wrapper.find('input[type="password"]').exists()).toBeTruthy();
    //has button
    expect(wrapper.find('button"]').exists()).toBeTruthy();
  });
});
