import { useState } from "react";
import {
  Button,
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

  // I think I need to add a useEffect hook to update initial form data after submitting the form.
  const initialFormData = {
    agentId: agent.agentId,
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

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [isEditable, setIsEditable] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("receiving:", e);
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.dir(formData);
  };

  const handlePersonalityChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormData((formData) => ({
      ...formData,
      postSettings: {
        ...formData.postSettings,
        personality: value,
      },
    }));
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
      setFormData((formData) => ({ ...formData, isEnabled: value }));
      if (value === false) {
        // if turning off, turn off off Post too
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
    }
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((formData) => ({
      ...formData,
      postSettings: { ...formData.postSettings, timezone: value },
    }));
  };

  const handleSubmit = async (): // e: React.FormEvent<HTMLFormElement>
  Promise<void> => {
    // e.preventDefault();
    setIsLoading(true);

    console.log("Submitting form data:");
    console.dir(formData);
    // Invoke API call
    try {
      const response = await api.patch(`agents`, formData);
      console.log("form submit response:", response);
    } catch (error) {
      console.log(`Failed to submit: ${error}`);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    console.log(`deleting ${agent.firstName}`);
    try {
      setIsLoading(true);
      const response = await api.delete("agents", { agentId: agent.agentId });
      console.log("Deleted successfully:", response);
      setIsLoading(false);
    } catch (error) {
      console.log("failed to delete:", error);
    }
  };

  return (
    <>
      <div className="overflow-hidden my-4 rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl my-2 px-8 text-gray-800"
        >
          {/* BASIC SETTINGS */}
          <div className=" flex flex-row justify-between items-center">
            <h3 className="py-2 text-2xl font-semibold">
              {agent.firstName} {agent.lastName}
            </h3>
            <div>
              <Button
                disabled={!isEditable}
                onClick={() => {
                  setFormData(initialFormData);
                  setIsEditable(false);
                }}
                className="data-[disabled]:hidden rounded-lg bg-none my-4 px-2 mx-2 text-sm text-red-800"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                formAction="submit"
                // type="button"
                onClick={() => {
                  if (isEditable) {
                    handleSubmit();
                    setIsEditable(false);
                  } else {
                    setIsEditable(true);
                  }
                }}
                className="bg-violet-900 text-gray-100 py-2 px-4 rounded-lg my-4 mx-2 data-[disabled]:bg-gray-500"
              >
                {isEditable ? "Save Edits" : "Edit Settings"}
              </Button>
            </div>
          </div>
          <Field
            className="gap-3 items-center flex flex-row my-1"
            disabled={!isEditable}
          >
            <Label className={"py-1 font-semibold"}>Enable Agent</Label>
            <Switch
              name="agentIsEnabled"
              id={`${agent.agentId}-isEnabled`}
              checked={formData.isEnabled}
              onChange={(value) => handleEnableChange("agent", value)}
              className={
                "group inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition data-[checked]:bg-violet-600 data-[disabled]:opacity-50"
              }
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
          </Field>
          {/* BASIC INFO */}
          <Fieldset
            className={"flex flex-wrap gap-2 my-2"}
            disabled={!isEditable}
          >
            <Field>
              <Label className={"flex justify-start text-sm p-1 font-semibold"}>
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
                  "border p-1 max-w-44 leading-tight focus:outline-solid 0 data-[disabled]:bg-transparent data-[disabled]:border-none"
                }
              />
            </Field>
            <Field>
              <Label className={"flex justify-start text-sm p-1 font-semibold"}>
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
                  "border p-1 max-w-44 leading-tight focus:outline-solid 0 data-[disabled]:bg-transparent data-[disabled]:border-none"
                }
              />
            </Field>
            <Field>
              <Label className={"flex justify-start text-sm p-1 font-semibold"}>
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
                  "border p-1 max-w-44 leading-tight focus:outline-solid 0 data-[disabled]:bg-transparent data-[disabled]:border-none"
                }
              />
            </Field>
            <Field>
              <Label className={"flex justify-start text-sm p-1 font-semibold"}>
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
                  "border p-1 max-w-44 leading-tight focus:outline-solid 0 data-[disabled]:bg-transparent data-[disabled]:border-none"
                }
              />
            </Field>
          </Fieldset>

          {/* ENABLED POSTING */}
          <Field
            className="flex flex-row py-2 gap-3 items-center font-semibold"
            disabled={!isEditable}
          >
            <Label className={""}>Enable Posting</Label>
            <Switch
              name="postIsEnabled"
              id={`${agent.agentId}-postIsEnabled`}
              checked={formData.postSettings.isEnabled}
              onChange={(value) => handleEnableChange("post", value)}
              className={
                "group inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition data-[checked]:bg-violet-600 data-[disabled]:opacity-50"
              }
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
          </Field>
          {/* SCHEDULE section */}
          <Fieldset
            className="flex flex-wrap py-2 items-center"
            disabled={!isEditable}
          >
            <Legend className="font-semibold">Post Schedule</Legend>
            <div className="flex flex-wrap">
              <Field className="ml-2">
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
                  className="flex-shrink-0 h-10 rounded-none border rounded-s-lg border-e-1  focus:ring-blue-500 focus:border-blue-500 text-sm border-gray-500 px-3 block bg-white"
                />
              </Field>
              {/* TIMEZONE */}
              <Field className="mr-2">
                <Select
                  name="timezone"
                  id={`${agent.agentId}-timezone`}
                  required
                  onChange={handleTimezoneChange}
                  value={formData.postSettings.timezone}
                  className={
                    "h-10 border border-s-0 border-gray-500 text-sm rounded-e-lg focus:ring-blue-500 focus:border-blue-500 block px-3 "
                  }
                >
                  {timezones.map((timezone) => (
                    <option key={timezone.timezone} value={timezone.timezone}>
                      {timezone.label}
                    </option>
                  ))}
                </Select>
              </Field>

              {/* DAYS section */}
              <div className="flex flex-row my-1 mx-2 gap-1">
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
                        handleDaysChange(day.value, checked);
                      }}
                      className="group size-8 items-center justify-center flex rounded-full border-1  bg-white data-[checked]:bg-violet-500 data-[disabled]:opacity-70 data-[disabled]:bg-gray-100"
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
          {/* PERSONALITY section */}
          <Fieldset disabled={!isEditable} className={"flex flex-col gap-2 "}>
            <Field
              className={
                "flex flex-row gap-4 items-center focus:outline-solid py-2"
              }
            >
              <div className="flex flex-row justify-start gap-4 items-baseline">
                <Label className={"py-1 font-semibold"}>
                  <p>Max Words per Post</p>
                </Label>
              </div>

              <Input
                type="number"
                name="maxWords"
                id={`${agent.agentId}-maxWords`}
                required
                min={minWordCount}
                max={maxWordCount}
                placeholder={String(formData.postSettings.maxWords) || "1500"}
                value={formData.postSettings.maxWords}
                onChange={handleChange}
                className={
                  "border data-[disabled]:border-none data-[disabled]:bg-transparent bg-white py-1 px-2 leading-tight focus:outline-none rounded-md max-h-10 data-[disabled]:text-gray-500"
                }
              />
              <Description className={"text-sm/6 data-[disabled]:hidden"}>
                Choose between {minWordCount} and {maxWordCount} words.
              </Description>
            </Field>

            <Field className="py-2">
              <div className="flex flex-row justify-start gap-4 items-baseline">
                <Label className={"font-semibold"}>Personality</Label>
                <Description className={"text-sm/6 data-[disabled]:hidden"}>
                  Describe the agent's writing style.
                </Description>
              </div>

              <Textarea
                rows={5}
                name="personality"
                id={`${agent.agentId}-personality`}
                placeholder={formData.postSettings.personality}
                autoComplete="lastName"
                maxLength={1000}
                value={formData.postSettings.personality}
                onChange={handlePersonalityChange}
                className={
                  "border w-full mr-3 py-1 px-2 leading-tight focus:outline-solid rounded-sm data-[disabled]:bg-transparent data-[disabled]:border-none"
                }
              />
            </Field>
          </Fieldset>
          <Button
            onClick={() => setIsDeleteVisible(!isDeleteVisible)}
            className="text-rose-700 text-sm  border-rose-700 border-b-2"
            hidden={!isEditable}
          >
            {isDeleteVisible ? "Nevermind" : "Delete this agent"}
          </Button>
          <span hidden={!isDeleteVisible} className="m-2 text-sm ">
            Are you sure? This action cannot be undone.
            <Button
              onClick={() => handleDelete()}
              className="text-rose-700 text-sm  border-rose-700 p-1 rounded-lg underline"
            >
              I'm sure.
            </Button>
          </span>
        </form>
      </div>
    </>
  );
};
