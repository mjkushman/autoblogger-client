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

import timezones from "@/app/fixtures/timezones";

type Props = {};

export const AgentSettingsForm = (props: Props) => {
  const initialFormData = {
    // update this to populate by useEffect, from account info
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    personality: "",
    maxWords: 1500,
    time: "",
    timezone: "",
    agentIsEnabled: false,
    postIsEnabled: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [postFormIsEnabled, setPostFormIsEnabled] = useState(
    initialFormData.postIsEnabled
  );
  const [agentFormIsEnabled, setAgentFormIsEnabled] = useState(
    initialFormData.agentIsEnabled
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.dir(formData);
  };

  const days: { abbr: string; value: string; enabled: boolean }[] = [
    { abbr: "M", value: "monday", enabled: false },
    { abbr: "T", value: "tuesday", enabled: false },
    { abbr: "W", value: "wednesday", enabled: false },
    { abbr: "Th", value: "thursday", enabled: false },
    { abbr: "F", value: "friday", enabled: false },
    { abbr: "Sa", value: "saturday", enabled: false },
    { abbr: "Su", value: "sunday", enabled: false },
  ];

  const [selectedDays, setSelectedDays] = useState(days);

  const [countSelectedDays, setCountSelectedDays] = useState(0);
  const maxDays = 2; // max number of days per week that can be selected
  const minWordCount = 100;
  const maxWordCount = 10000;

  const handleDaysChange = (dayValue: string, checked: boolean) => {
    // if it's already selected OR total days < max, proceed to either select or unselect

    const currentSelectedCount = selectedDays.filter(
      (day) => day.enabled
    ).length;
    // console.log('currentSelectedCount', currentSelectedCount)

    // check if we are already at max days
    if (checked && currentSelectedCount >= maxDays) {
      console.log("already at max days");
      return; // returns without doing more.
    }
    // update the day
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.map((day) =>
        day.value === dayValue ? { ...day, enabled: checked } : { ...day }
      )
    );
    // update the current count of days selected
    // increment or decrement total days
    setCountSelectedDays((prevCount) =>
      checked ? prevCount + 1 : prevCount - 1
    ); // updating this day
  };

  const handleEnableChange = (field: "post" | "agent", value: boolean) => {
    if (field === "agent") {
      setAgentFormIsEnabled(value);
      setFormData((formData) => ({ ...formData, agentIsEnabled: value }));
      if (value === false) {
        // if turning off, turn off off Post too
        setPostFormIsEnabled(value);
        setFormData((formData) => ({ ...formData, postIsEnabled: value }));
      }
    } else if (field === "post") {
      setFormData((formData) => ({ ...formData, postIsEnabled: value }));
      setPostFormIsEnabled(value);
    }
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((formData) => ({ ...formData, timezone: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    console.log("Submitting form data:");
    console.dir(formData);

    // Invoke API call
    try {
      console.log("form submitted. TODO: implement API logic");

      setFormData(initialFormData);
    } catch (error) {
      console.log(`Failed to submit: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl my-2 rounded-md px-8 text-gray-800"
    >
      {/* BASIC SETTINGS */}
      <Field className="flex flex-row my-4 justify-between items-center">
        <Label className={"text-xl py-1"}>Enable Agent</Label>
        <Switch
          name="agentIsEnabled"
          id="agentIsEnabled"
          checked={formData.agentIsEnabled}
          onChange={(value) => handleEnableChange("agent", value)}
          className={
            "group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          }
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
      </Field>
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
            id="firstName"
            required
            placeholder="Hal"
            autoComplete="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={
              "bg-transparent border border-violet-900 py-1 px-2 leading-tight focus:outline-solid rounded-md h-10"
            }
          />
        </Field>
        <Field>
          <Label className={"flex justify-start text-sm py-1"}>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="9000"
            autoComplete="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={
              "bg-transparent border border-violet-900 py-1 px-2 leading-tight focus:outline-solid rounded-md h-10"
            }
          />
        </Field>
        <Field>
          <Label className={"flex justify-start text-sm py-1"}>Username</Label>
          <Input
            type="username"
            name="username"
            id="username"
            required
            placeholder="hal9000"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            className={
              "bg-transparent border border-violet-900 py-1 px-2 leading-tight focus:outline-solid rounded-md h-10"
            }
          />
        </Field>
        <Field>
          <Label
            className={"flex justify-start text-sm text-gray-700 px-2 py-1"}
          >
            Email
          </Label>
          <Input
            type="text"
            name="email"
            id="email"
            required
            placeholder="hal@spacestation.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={
              "bg-transparent border border-violet-900  w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none rounded-md text-lg h-10"
            }
          />
        </Field>
      </Fieldset>

      {/* ENABLED POSTING */}
      <Field
        className="flex flex-row my-4 justify-between items-center data-[disabled]:text-gray-400"
        disabled={!agentFormIsEnabled}
      >
        <Label className={"text-xl py-1"}>Enable Posting</Label>
        <Switch
          name="postIsEnabled"
          id="postIsEnabled"
          checked={formData.postIsEnabled}
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
            id="maxWords"
            required
            min={minWordCount}
            max={maxWordCount}
            placeholder="1500"
            value={formData.maxWords}
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
            id="personality"
            placeholder="Loves to incorporate dad jokes into their writing"
            autoComplete="lastName"
            maxLength={1000}
            value={formData.personality}
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
        <Legend>Schedule</Legend>
        <div className="flex items-center  flex-wrap">
          <div className="flex-row flex mr-4">
            <Field>
              {/* Time */}
              <Input
                type="time"
                name="time"
                id="time"
                required
                value={formData.time}
                onChange={handleChange}
                min="09:00"
                max="18:00"
                className="flex-shrink-0 h-10 rounded-none rounded-s-lg bg-gray-50 border leading-none focus:ring-blue-500 focus:border-blue-500 text-sm border-gray-300 p-2.5 block"
              />
            </Field>
            {/* TIMEZONE */}
            <Field>
              <Select
                name="timezone"
                id="timezone"
                required
                onChange={handleTimezoneChange}
                value={formData.timezone}
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
            {selectedDays.map((day) => {
              return (
                <Checkbox
                  key={day.value}
                  checked={day.enabled}
                  disabled={countSelectedDays >= maxDays && !day.enabled}
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
  );
};
