import { useState } from "react";
import {
  Checkbox,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Switch,
  Textarea,
} from "@headlessui/react";
import api from "@/utils/api";

import timezones from "@/app/fixtures/timezones";
import { Agent } from "@/types";

type Props = {
  agent: Agent;
};

export const AgentSettingsForm = ({ agent }: Props) => {
  // const agent = account.Agents[1];
  // console.log("passed agent", agent);
  const initialFormData = {
    isEnabled: agent.isEnabled,
    firstName: agent.firstName,
    lastName: agent.lastName,
    email: agent.email,
    username: agent.username,
    postSettings: {
      isEnabled: agent.postSettings.isEnabled,
      personality: agent.postSettings.personality,
      maxWords: agent.postSettings.maxWords,
      time: agent.postSettings.time || "12:00",
      daysOfWeek: agent.postSettings.daysOfWeek || ["mon", "wed"],
      timezone: agent.postSettings.timezone || "America/Los_Angeles",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [postFormIsEnabled, setPostFormIsEnabled] = useState(
    initialFormData.postSettings.isEnabled
  );
  const [agentFormIsEnabled, setAgentFormIsEnabled] = useState(
    initialFormData.isEnabled
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    console.log("receiving:", e);
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.dir(formData);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log("NEW TIME:", value);
    setFormData((formData) => ({
      ...formData,
      postSettings: {
        ...formData.postSettings,
        time: value,
      },
    }));
  };

  const days: { abbr: string; value: string; enabled: boolean }[] = [
    { abbr: "M", value: "mon", enabled: false },
    { abbr: "T", value: "tue", enabled: false },
    { abbr: "W", value: "wed", enabled: false },
    { abbr: "Th", value: "thu", enabled: false },
    { abbr: "F", value: "fri", enabled: false },
    { abbr: "Sa", value: "sat", enabled: false },
    { abbr: "Su", value: "sun", enabled: false },
  ];

  const maxDays = 2; // max number of days per week that can be selected
  const minWordCount = 100;
  const maxWordCount = 10000;

  const handleDaysChange = (dayValue: string, checked: boolean) => {
    // if it's already selected OR total days < max, proceed to either select or unselect
    const currentSelectedCount = formData.postSettings.daysOfWeek.length;
    // check if we are already at max days
    if (checked && currentSelectedCount >= maxDays) {
      console.log("already at max days");
      return; // returns without doing more.
    }
    // And update formData
    setFormData((formData) => {
      let currentDays: string[] = [...formData.postSettings.daysOfWeek];
      if (checked) {
        currentDays = [...currentDays, dayValue];
      } else {
        currentDays = [...currentDays].filter((day) => day !== dayValue);
      }

      return {
        ...formData,
        postSettings: {
          ...formData.postSettings,
          daysOfWeek: currentDays,
        },
      };
    });
    console.log(
      "formData.postSettings.daysOfWeek:",
      formData.postSettings.daysOfWeek
    );
  };

  const handleEnableChange = (field: "post" | "agent", value: boolean) => {
    if (field === "agent") {
      setAgentFormIsEnabled(value);
      setFormData((formData) => ({ ...formData, isEnabled: value }));
      if (value === false) {
        // if turning off, turn off off Post too
        setPostFormIsEnabled(value);
        setFormData((formData) => ({
          ...formData,
          postSettings: { ...formData.postSettings, isEnabled: value },
        }));
      }
    } else if (field === "post") {
      setFormData((formData) => ({
        ...formData,
        postSettings: { ...formData.postSettings, isEnabled: value },
      }));
      setPostFormIsEnabled(value);
    }
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((formData) => ({
      ...formData,
      postSettings: { ...formData.postSettings, timezone: value },
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>, 
  ): Promise<void> => {
    e.preventDefault();
    console.log("Submitting form data:");
    console.log("for agent:", agent.agentId)
    // Build the crontab expression
    console.dir(formData);

    // Invoke API call
    try {
      console.log("form submitted. TODO: implement API logic");
      // const response = await api.patch("/")

      setFormData(initialFormData);
    } catch (error) {
      console.log(`Failed to submit: ${error}`);
    }
  };

  return (
    <div className="overflow-hidden my-4 rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <form
        onSubmit={ handleSubmit}
        className="w-full max-w-4xl my-2 px-8 text-gray-800"
      >
        {/* BASIC SETTINGS */}
        <div className=" flex flex-row justify-between items-centergap-3">
          <h3 className="py-2 text-2xl font-semibold">
            Settings for: {agent.firstName}
          </h3>

          <Field className="justify-end gap-3 items-center flex flex-row">
            <Label className={"text-xl py-1"}>Enable Agent</Label>
            <Switch
              name="agentIsEnabled"
              id={`${agent.agentId}-isEnabled`}
              checked={formData.isEnabled}
              onChange={(value) => handleEnableChange("agent", value)}
              className={
                "group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
              }
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
          </Field>
        </div>
        <Fieldset
          className={"flex flex-wrap gap-2 data-[disabled]:text-gray-400"}
          disabled={!agentFormIsEnabled}
        >
          <Field>
            <Label className={"flex justify-start text-sm py-1"}>
              First Name
            </Label>
            <Input
              type="text"
              name="firstName"
              id={`${agent.agentId}-firstName`}
              required
              placeholder="Enter a first name"
              autoComplete="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900 py-1 px-2 max-w-44 leading-tight focus:outline-solid rounded-md"
              }
            />
          </Field>
          <Field>
            <Label className={"flex justify-start text-sm py-1"}>
              Last Name
            </Label>
            <Input
              type="text"
              name="lastName"
              id={`${agent.agentId}-lastName`}
              placeholder="Enter a last name"
              autoComplete="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900 py-1 px-2 max-w-44 leading-tight focus:outline-solid rounded-md"
              }
            />
          </Field>
          <Field>
            <Label className={"flex justify-start text-sm py-1"}>
              Username
            </Label>
            <Input
              type="username"
              name="username"
              id={`${agent.agentId}-username`}
              required
              placeholder={initialFormData.username}
              autoComplete="Username"
              value={formData.username}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900 py-1 px-2 max-w-44 leading-tight focus:outline-solid rounded-md"
              }
            />
          </Field>
          <Field>
            <Label className={"flex justify-start text-sm px-2 py-1"}>
              Email
            </Label>
            <Input
              type="text"
              name="email"
              id={`${agent.agentId}-email`}
              required
              placeholder="Email address"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900 py-1 px-2 max-w-44 leading-tight focus:outline-none rounded-md"
              }
            />
          </Field>
        </Fieldset>

        {/* ENABLED POSTING */}
        <Field
          className="flex flex-row mb-4 mt-8 justify-end gap-3 items-center data-[disabled]:text-gray-400"
          disabled={!agentFormIsEnabled}
        >
          <Label className={"text-xl py-1"}>Enable Posting</Label>
          <Switch
            name="postIsEnabled"
            id={`${agent.agentId}-postIsEnabled`}
            checked={formData.postSettings.isEnabled}
            onChange={(value) => handleEnableChange("post", value)}
            className={
              "group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
            }
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </Field>

        {/* PERSONALITY section */}
        <Fieldset
          disabled={!postFormIsEnabled || !agentFormIsEnabled} // Disables this section
          className={"flex flex-col gap-2 data-[disabled]:text-gray-400"}
        >
          <Field
            className={
              "flex flex-row justify-between items-center focus:outline-solid "
            }
          >
            <div className="">
              <Label className={"py-1"}>
                <p>Max Words per Post</p>
                <p className={"text-sm/6"}>
                  Choose between {minWordCount} and {maxWordCount} words.
                </p>
              </Label>
            </div>

            <Input
              type="number"
              name="maxWords"
              id={`${agent.agentId}-maxWords`}
              required
              min={minWordCount}
              max={maxWordCount}
              placeholder="1500"
              value={formData.postSettings.maxWords}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-md max-h-10"
              }
            />
          </Field>

          <Field>
            <Label className={"flex justify-start py-1"}>Personality</Label>
            <Description className={"text-sm/6"}>
              Describe the agent's writing style.
            </Description>
            <Textarea
              rows={5}
              name="personality"
              id={`${agent.agentId}-personality`}
              placeholder="Loves to incorporate dad jokes into their writing"
              autoComplete="lastName"
              maxLength={1000}
              value={formData.postSettings.personality}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900  w-full mr-3 py-1 px-2 leading-tight focus:outline-solid rounded-md"
              }
            />
          </Field>
        </Fieldset>

        {/* SCHEDULE section */}
        <Fieldset
          className=" data-[disabled]:text-gray-400 flex-wrap"
          disabled={!postFormIsEnabled}
        >
          <Legend>Post Schedule</Legend>
          <div className="flex items-center  flex-wrap">
            <div className="flex-row flex mr-4">
              <Field>
                {/* Time */}
                <Input
                  type="time"
                  name="time"
                  id={`${agent.agentId}-time`}
                  required
                  value={formData.postSettings.time}
                  onChange={handleTimeChange}
                  min="00:00"
                  max="23:59"
                  className="flex-shrink-0 h-10 rounded-none rounded-s-lg bg-gray-50 border leading-none focus:ring-blue-500 focus:border-blue-500 text-sm border-gray-300 p-2.5 block"
                />
              </Field>
              {/* TIMEZONE */}
              <Field>
                <Select
                  name="timezone"
                  id={`${agent.agentId}-timezone`}
                  required
                  onChange={handleTimezoneChange}
                  value={formData.postSettings.timezone}
                  className={
                    "bg-gray-50 h-10 border border-s-0 border-gray-300  text-sm rounded-e-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  }
                >
                  {timezones.map((timezone) => (
                    <option key={timezone.timezone} value={timezone.timezone}>
                      {timezone.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            {/* DAYS section */}
            <div className="flex flex-row my-1">
              {days.map((day) => {
                return (
                  <Checkbox
                    key={agent.agentId + day.value}
                    checked={formData.postSettings.daysOfWeek.includes(
                      day.value
                    )}
                    disabled={
                      formData.postSettings.daysOfWeek.length >= maxDays &&
                      !formData.postSettings.daysOfWeek.includes(day.value)
                    }
                    onChange={(checked) => {
                      console.log(`turning to: ${checked}`);
                      handleDaysChange(day.value, checked);
                    }}
                    className="group size-10 items-center text-inherit justify-center flex rounded-full border-2 bg-white data-[checked]:bg-violet-400 data-[disabled]:bg-gray-200 data-[disabled]:text-gray-500"
                  >
                    {day.abbr}
                  </Checkbox>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex"></div>
          </div>
        </Fieldset>

        <button
          formAction="submit"
          className="bg-violet-900 text-gray-100 py-2 px-4 rounded-lg my-8"
        >
          Save settings
        </button>
      </form>
    </div>
  );
};
