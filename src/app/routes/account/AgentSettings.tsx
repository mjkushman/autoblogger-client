import React, { useState } from "react";
import {
  Checkbox,
  Field,
  Fieldset,
  Button,
  Input,
  Label,
  Legend,
  // Select,
  Switch,
  Textarea,
} from "@headlessui/react";
import {
  Button as StyledButton,
  FloatingLabel,
  LabeledInput,
  Select,
  TimeInput,
} from "@/components";

import timezones from "@/app/fixtures/timezones";
import models from "@/app/fixtures/llmModels";
import { Agent } from "@/types";
import { AgentFormData } from "@/types";

type Props = {
  agent: Agent;
  updateAgent: (formData: AgentFormData) => Promise<void>;
  deleteAgent: (agentId: string) => Promise<void>;
};

export const AgentSettingsForm = ({
  agent,
  updateAgent,
  deleteAgent,
}: Props) => {
  // I think I need to add a useEffect hook to update initial form data after submitting the form.
  const initialFormData: AgentFormData = {
    agentId: agent.agentId,
    isEnabled: agent.isEnabled,
    firstName: agent.firstName,
    lastName: agent.lastName,
    email: agent.email,
    llm: {
      model: agent.llm.model,
      apiKey: agent.llm.apiKey,
    },
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

  const [formData, setFormData] = useState<AgentFormData>(initialFormData);
  // console.log('FORM DATA ON MOUNT', formData)

  const [isEditable, setIsEditable] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isApiKeyVisibile, setIsApiKeyVisibile] = useState<boolean>(false);

  const isDataChanged =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;
    const namePath = name.split("."); // e.g., 'postSettings.time' -> ['postSettings', 'time']

    setFormData((prevFormData: AgentFormData): AgentFormData => {
      // Use a helper function to update the nested field
      const updatedFormData = updateNestedField(prevFormData, namePath, value);
      return updatedFormData;
    });
  }

  // Helper function to immutably update a nested field using recursion
  function updateNestedField(
    obj: Record<string | any>, // Generic object
    keys: string[], // Path to the nested field
    value: any // New value
  ): Record<string, any> {
    const [currentKey, ...remainingKeys] = keys;

    if (remainingKeys.length === 0) {
      // Base case: update the final key
      return { ...obj, [currentKey]: value };
    }

    // Recursive case: traverse deeper
    return {
      ...obj,
      [currentKey]: updateNestedField(
        obj[currentKey] || {},
        remainingKeys,
        value
      ),
    };
  }

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
    const currentSelectedCount = formData?.postSettings?.daysOfWeek?.length;
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData))
      updateAgent(formData);
  };

  const handleDelete = async () => {
    console.log(`deleting ${agent.firstName}`);
    deleteAgent(agent.agentId);
  };

  return (
    <>
      <div className="overflow-hidden bg-violet-50 my-4 rounded-xl sm:px-8 sm:drop-shadow-md border border-gray-300">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl my-2 px-8 py-4 text-gray-800 "
        >
          {/* BASIC SETTINGS */}
          <div className=" flex flex-row justify-between items-center">
            <h3 className="py-2 text-2xl font-semibold">{agent.firstName}</h3>

            <div>
              <StyledButton
                disabled={!isDataChanged || isLoading}
                formAction="submit"
                type="submit"
                className="data-[disabled]:invisible shadow-2xl"
              >
                Save
              </StyledButton>
            </div>
          </div>

          {/* <Fieldset>
            <Field className="gap-3 items-center flex flex-row my-1">
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
          </Fieldset> */}

          {/* BASIC INFO */}
          <Fieldset>
            <Legend className={"block font-semibold"}>Basic Info</Legend>
            <div className={"flex flex-wrap gap-1 my-0"}>
              <Field className={"relative flex-grow"}>
                <LabeledInput
                  type="text"
                  name="firstName"
                  label="First Name"
                  id={`${agent.agentId}-firstName`}
                  required
                  autoComplete="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Field>

              <Field className={"relative flex-grow"}>
                <LabeledInput
                  type="text"
                  name="lastName"
                  label="Last Name"
                  id={`${agent.agentId}-lastName`}
                  autoComplete="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Field>
              <Field className={"relative flex-grow"}>
                <LabeledInput
                  type="text"
                  name="username"
                  label="Username"
                  id={`${agent.agentId}-username`}
                  required
                  autoComplete="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Field>
              <Field className={"relative flex-grow"}>
                <LabeledInput
                  type="text"
                  name="email"
                  label="Email"
                  id={`${agent.agentId}-email`}
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Field>
              <Field className="relative flex-grow-0">
                <Select
                  name="llm.model"
                  id={`${agent.agentId}-model`}
                  required
                  onChange={handleChange}
                  value={formData.llm.model}
                  className={"pt-5 pb-3 rounded-md text-sm"}
                >
                  {models.map((model) => (
                    <option key={model.model} value={model.model}>
                      {model.label}
                    </option>
                  ))}
                </Select>
                <FloatingLabel htmlFor={`${agent.agentId}-mdoel`}>
                  LLM
                </FloatingLabel>
              </Field>

              <Field className={"relative flex-grow"}>
                <LabeledInput
                  type={isApiKeyVisibile ? "text" : "password"}
                  name="llm.apiKey"
                  label={`${formData.llm.model} API Key`}
                  id={`${agent.agentId}-apiKey`}
                  required
                  value={formData.llm.apiKey}
                  onChange={handleChange}
                  className=""
                />
              </Field>
              <Button
                className="p-1 text-sm rounded-xl bg-gray-200"
                onClick={() => setIsApiKeyVisibile(!isApiKeyVisibile)}
              >
                {isApiKeyVisibile ? "Hide" : "Show"}
              </Button>
            </div>
          </Fieldset>

          {/* POSTING SETTINGS*/}
          <Fieldset className={"my-4"}>
            <Legend className={"block font-semibold"}>Post settings</Legend>
            <div className="flex gap-1 my-1 items-center">
              {/* SCHEDULE section */}
              {/* <Fieldset className="py-2 items-center"> */}
              {/* <Legend className="text-md">Schedule</Legend> */}
              <div className="flex flex-wrap">
                {/* Time */}
                <TimeInput
                  name="time"
                  label="Time"
                  id={`${agent.agentId}-time`}
                  required
                  value={formData.postSettings.time}
                  onChange={handleChange}
                  min="00:00"
                  max="23:59"
                  // className=""
                />

                {/* TIMEZONE */}

                <Field className="mr-2 relative">
                  <Select
                    name="postSettings.timezone"
                    id={`${agent.agentId}-timezone`}
                    required
                    onChange={handleChange}
                    value={formData.postSettings.timezone}
                    className={"pt-5 pb-4 rounded-md"}
                  >
                    {timezones.map((timezone) => (
                      <option key={timezone.timezone} value={timezone.timezone}>
                        {timezone.label}
                      </option>
                    ))}
                  </Select>
                  <FloatingLabel htmlFor={`${agent.agentId}-timezone`}>
                    Timezone
                  </FloatingLabel>
                </Field>
              </div>
              {/* DAYS section */}
              <div className="flex flex-row flex-wrap gap-1">
                {days.map((day) => {
                  return (
                    <Checkbox
                      key={agent.agentId + day.value}
                      checked={
                        formData.postSettings.daysOfWeek &&
                        formData.postSettings.daysOfWeek.includes(day.value)
                      }
                      disabled={
                        formData.postSettings.daysOfWeek &&
                        formData.postSettings.daysOfWeek.length >= maxDays &&
                        !formData.postSettings.daysOfWeek.includes(day.value)
                      }
                      onChange={(checked) => {
                        handleDaysChange(day.value, checked);
                      }}
                      className="size-8 items-center justify-center flex rounded-full border-1  bg-white data-[checked]:bg-violet-500 data-[disabled]:opacity-70 data-[disabled]:bg-gray-100"
                    >
                      {day.abbr}
                    </Checkbox>
                  );
                })}
              </div>
              <Field className="flex flex-row gap-3 items-center text-md mx-2">
                <Label className={"font-bold"}>Enable Posting</Label>
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
            </div>

            {/* </Fieldset> */}
          </Fieldset>
          {/* PERSONALITY section */}

          <Fieldset className={"my-4"}>
            <Legend className={"block font-semibold"}>
              Writing Personality
            </Legend>
            <div className="flex">
              <Field className="relative">
                <Input
                  type="number"
                  name="postSettings.maxWords"
                  id={`${agent.agentId}-maxWords`}
                  required
                  min={minWordCount}
                  max={maxWordCount}
                  placeholder={String(formData.postSettings.maxWords) || " "}
                  value={formData.postSettings.maxWords}
                  onChange={handleChange}
                  className="max-w-fit min-w-24 block w-full px-4 pt-5 pb-2.5 rounded-md font-medium focus:outline-none peer"
                />
                <FloatingLabel htmlFor={`${agent.agentId}-maxWords`}>
                  Word Limit
                </FloatingLabel>
              </Field>

              <div className="relative w-full">
                <Field className="w-full">
                  {/* <Description className={"text-sm/6"}>
                    Describe the agent's writing style.
                    </Description> */}

                  <Textarea
                    rows={5}
                    name="postSettings.personality"
                    id={`${agent.agentId}-personality`}
                    placeholder={formData.postSettings.personality}
                    maxLength={1000}
                    value={formData.postSettings.personality}
                    onChange={handleChange}
                    className={
                      "block w-full mx-2 pt-8 px-2 pb-2 rounded-md leading-tight peer"
                    }
                  />
                  <FloatingLabel
                    htmlFor={`${agent.agentId}-personality`}
                    className="text-xl"
                  >
                    Describe the writing style.
                  </FloatingLabel>
                </Field>
              </div>
            </div>
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
