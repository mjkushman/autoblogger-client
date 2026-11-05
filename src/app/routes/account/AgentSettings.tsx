import React, { useState } from "react";
import {
  Checkbox,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Switch,
  Textarea,
} from "@headlessui/react";
import {
  Button,
  ConfirmDialog,
  FloatingLabel,
  InfoTip,
  LabeledInput,
  SaveStatus,
  Select,
  TimeInput,
  Tooltip,
  fieldStyles,
} from "@/components";
import { useSaveStatus } from "@/app/hooks/useSaveStatus";
import { AvatarPicker } from "./AvatarPicker";

import timezones from "@/app/fixtures/timezones";
import models, {
  DEFAULT_MODEL,
  providerName,
  resolveModel,
} from "@/app/fixtures/llmModels";
import { Agent } from "@/types";
import { CreateAgentFormData, UpdateAgentFormData } from "@/types";

type Props = {
  agent: Agent | null;
  isLoading: boolean;
  updateAgent?: (formData: UpdateAgentFormData) => Promise<void>;
  deleteAgent?: (agentId: string) => Promise<void>;
  createAgent?: (formdata: CreateAgentFormData) => Promise<void>;
  children?: React.ReactNode;
};

const days = [
  { abbr: "M", name: "Monday", value: "mon" },
  { abbr: "T", name: "Tuesday", value: "tue" },
  { abbr: "W", name: "Wednesday", value: "wed" },
  { abbr: "Th", name: "Thursday", value: "thu" },
  { abbr: "F", name: "Friday", value: "fri" },
  { abbr: "Sa", name: "Saturday", value: "sat" },
  { abbr: "Su", name: "Sunday", value: "sun" },
];

const minWordCount = 100;
const maxWordCount = 10000;
const maxPersonalityLength = 1000;

/** One titled group of fields: heading on the left, controls on the right */
const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Fieldset className="grid gap-4 py-6 md:grid-cols-[13rem_1fr] md:gap-8">
    <div>
      <Legend className="text-sm font-semibold text-gray-900">{title}</Legend>
      <p className="mt-1 text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
    <div className="space-y-4">{children}</div>
  </Fieldset>
);

export const AgentSettingsForm = ({
  agent,
  updateAgent,
  deleteAgent,
  createAgent,
  isLoading,
  children,
}: Props) => {
  const initialFormData = (): UpdateAgentFormData | CreateAgentFormData => {
    if (agent) {
      return {
        agentId: agent.agentId,
        isEnabled: agent.isEnabled,
        imageUrl: agent.imageUrl,
        firstName: agent.firstName,
        lastName: agent.lastName,
        email: agent.email,
        username: agent.username,
        llm: {
          model: resolveModel(agent.llm.model), // maps legacy "chatgpt"/"claude" values
          apiKey: agent.llm.apiKey,
        },
        postSettings: {
          isEnabled: agent.postSettings.isEnabled,
          personality: agent.postSettings.personality,
          maxWords: agent.postSettings.maxWords,
          time: agent.postSettings.time,
          daysOfWeek: agent.postSettings.daysOfWeek,
          timezone: agent.postSettings.timezone,
        },
      };
    }
    return {
      isEnabled: false,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      llm: {
        model: DEFAULT_MODEL,
        apiKey: "",
      },
      postSettings: {
        isEnabled: false,
        personality: "",
        maxWords: 500,
        time: "",
        daysOfWeek: [],
        timezone: timezones[0].timezone, // select shows the first option, so state must match
      },
    };
  };

  const [formData, setFormData] = useState<CreateAgentFormData | UpdateAgentFormData>(
    initialFormData()
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isApiKeyVisibile, setIsApiKeyVisibile] = useState<boolean>(false);
  const { isSaving, isSaved, error, run } = useSaveStatus();

  const isDataChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData());
  const provider = providerName(formData.llm.model);
  const agentName = agent ? `${agent.firstName} ${agent.lastName ?? ""}`.trim() : "New agent";

  // Helper function to immutably update a nested field using recursion
  function updateNestedField(
    obj: Record<string, any>,
    keys: string[], // Path to the nested field, e.g. ['postSettings', 'time']
    value: any
  ): Record<string, any> {
    const [currentKey, ...remainingKeys] = keys;
    if (remainingKeys.length === 0) return { ...obj, [currentKey]: value };
    return {
      ...obj,
      [currentKey]: updateNestedField(obj[currentKey] || {}, remainingKeys, value),
    };
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;
    const parsed = type === "number" && value !== "" ? Number(value) : value;
    setFormData((prevFormData) => {
      const updatedFormData = updateNestedField(prevFormData, name.split("."), parsed);
      if (updatedFormData.agentId) return updatedFormData as UpdateAgentFormData;
      return updatedFormData as CreateAgentFormData;
    });
  }

  const handleDaysChange = (dayValue: string, checked: boolean) => {
    setFormData((formData: CreateAgentFormData | UpdateAgentFormData) => {
      const currentDays: string[] = formData.postSettings.daysOfWeek || [];
      return {
        ...formData,
        postSettings: {
          ...formData.postSettings,
          daysOfWeek: checked
            ? [...currentDays, dayValue]
            : currentDays.filter((day) => day !== dayValue),
        },
      };
    });
  };

  const handlePostingChange = (value: boolean) => {
    setFormData((formData) => ({
      ...formData,
      postSettings: { ...formData.postSettings, isEnabled: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!isDataChanged) return;
    await run(async () => {
      if (agent && agent.agentId && updateAgent) await updateAgent(formData as UpdateAgentFormData);
      else if (createAgent) await createAgent(formData);
    }, "We couldn't save this agent. Please check the details and try again.");
  };

  const handleDelete = async () => {
    if (!deleteAgent || !agent) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteAgent(agent.agentId);
      setIsDeleteOpen(false);
    } catch {
      setDeleteError("We couldn't delete this agent. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const id = (field: string) => `${agent?.agentId ?? "new"}-${field}`;
  const isPosting = agent?.postSettings.isEnabled;

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow duration-200 hover:shadow-md">
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <AvatarPicker
              imageUrl={formData.imageUrl}
              initial={agent ? agentName.charAt(0).toUpperCase() : "+"}
              onChange={(imageUrl) => setFormData((prev) => ({ ...prev, imageUrl }))}
            />
            <div>
              <h3 className="font-semibold leading-tight text-gray-900">{agentName}</h3>
              {agent && <p className="text-sm text-gray-500">@{agent.username}</p>}
            </div>
            {agent && (
              <span
                className={
                  isPosting
                    ? "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200"
                    : "rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
                }
              >
                {isPosting ? "Posting on schedule" : "Paused"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <SaveStatus isSaving={isSaving} isSaved={isSaved} error={error} />
            <Button type="submit" disabled={!isDataChanged || isLoading} loading={isSaving}>
              {agent ? "Save changes" : "Create agent"}
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-100 px-6">
          {/* PROFILE */}
          <Section title="Profile" description="Who this author is, as readers will meet them.">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field className="relative">
                <LabeledInput
                  type="text"
                  name="firstName"
                  label="First name"
                  id={id("firstName")}
                  required
                  autoComplete="off"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Field>
              <Field className="relative">
                <LabeledInput
                  type="text"
                  name="lastName"
                  label="Last name"
                  id={id("lastName")}
                  autoComplete="off"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Field>
              <Field className="relative">
                <LabeledInput
                  type="text"
                  name="username"
                  label="Username"
                  id={id("username")}
                  required
                  autoComplete="off"
                  tip="A short, unique handle for this author. It can't be shared with another author on your account."
                  value={formData.username}
                  onChange={handleChange}
                />
              </Field>
              <Field className="relative">
                <LabeledInput
                  type="email"
                  name="email"
                  label="Email"
                  id={id("email")}
                  required
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Field>
            </div>
          </Section>

          {/* MODEL */}
          <Section
            title="AI model"
            description="Which model writes the posts, and the key it uses to do it."
          >
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Field className="relative">
                <Select
                  name="llm.model"
                  id={id("model")}
                  required
                  onChange={handleChange}
                  value={formData.llm.model}
                >
                  <optgroup label="OpenAI">
                    {models
                      .filter((m) => m.provider === "openai")
                      .map((m) => (
                        <option key={m.model} value={m.model}>
                          {m.label}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Anthropic">
                    {models
                      .filter((m) => m.provider === "anthropic")
                      .map((m) => (
                        <option key={m.model} value={m.model}>
                          {m.label}
                        </option>
                      ))}
                  </optgroup>
                </Select>
                <FloatingLabel htmlFor={id("model")}>Model</FloatingLabel>
                <span className="absolute end-9 top-3.5 z-20">
                  <InfoTip label="The AI model that writes this author's posts. Larger models usually write better, but cost more per post." />
                </span>
              </Field>
            </div>
            <div className="flex items-start gap-2">
              <Field className="relative flex-1">
                <LabeledInput
                  type={isApiKeyVisibile ? "text" : "password"}
                  name="llm.apiKey"
                  label={`${provider} API key`}
                  id={id("apiKey")}
                  required
                  autoComplete="off"
                  tip={`Your own ${provider} API key. Autoblogger uses it to write posts, and ${provider} bills your usage to your account there.`}
                  value={formData.llm.apiKey}
                  onChange={handleChange}
                />
              </Field>
              <Button
                variant="secondary"
                className="h-[3.125rem] w-20"
                aria-pressed={isApiKeyVisibile}
                onClick={() => setIsApiKeyVisibile(!isApiKeyVisibile)}
              >
                {isApiKeyVisibile ? "Hide" : "Show"}
              </Button>
            </div>
          </Section>

          {/* SCHEDULE */}
          <Section
            title="Schedule"
            description="When this author should publish a new post."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <TimeInput
                name="postSettings.time"
                label="Time"
                id={id("time")}
                required
                tip="The time of day a new post is written and published, in the timezone you choose."
                value={formData.postSettings.time}
                onChange={handleChange}
                min="00:00"
                max="23:59"
              />
              <Field className="relative">
                <Select
                  name="postSettings.timezone"
                  id={id("timezone")}
                  required
                  onChange={handleChange}
                  value={formData.postSettings.timezone}
                >
                  {timezones.map((timezone) => (
                    <option key={timezone.timezone} value={timezone.timezone}>
                      {timezone.label}
                    </option>
                  ))}
                </Select>
                <FloatingLabel htmlFor={id("timezone")}>Timezone</FloatingLabel>
              </Field>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700" id={id("days-label")}>
                Publish on
                <InfoTip label="Pick the days of the week that get a new post. Pick none to pause." />
              </p>
              <div role="group" aria-labelledby={id("days-label")} className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <Tooltip key={day.value} label={day.name}>
                    <Checkbox
                      checked={formData.postSettings.daysOfWeek?.includes(day.value) ?? false}
                      onChange={(checked) => handleDaysChange(day.value, checked)}
                      aria-label={day.name}
                      className="grid size-10 cursor-pointer place-items-center rounded-full bg-white text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-300 transition duration-150 hover:bg-violet-50 hover:ring-violet-400 active:scale-95 data-[checked]:bg-violet-700 data-[checked]:text-white data-[checked]:ring-violet-700 data-[checked]:hover:bg-violet-800"
                    >
                      {day.abbr}
                    </Checkbox>
                  </Tooltip>
                ))}
              </div>
            </div>

            <Field className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-inset ring-gray-200">
              <div>
                <Label className="text-sm font-medium text-gray-900">Publish on schedule</Label>
                <Description className="text-sm text-gray-500">
                  Turn off to pause posting without losing your settings.
                </Description>
              </div>
              <Switch
                name="postIsEnabled"
                checked={formData.postSettings.isEnabled ?? false}
                onChange={handlePostingChange}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-gray-300 transition-colors duration-200 data-[checked]:bg-violet-700 data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-violet-500"
              >
                <span className="size-4 translate-x-1 rounded-full bg-white shadow transition-transform duration-200 group-data-[checked]:translate-x-6" />
              </Switch>
            </Field>
          </Section>

          {/* WRITING STYLE */}
          <Section
            title="Writing style"
            description="How long each post is, and the voice it's written in."
          >
            <Field className="relative max-w-44">
              <Input
                type="number"
                name="postSettings.maxWords"
                id={id("maxWords")}
                required
                min={minWordCount}
                max={maxWordCount}
                placeholder=" "
                value={formData.postSettings.maxWords}
                onChange={handleChange}
                className={fieldStyles}
              />
              <FloatingLabel htmlFor={id("maxWords")}>Words per post</FloatingLabel>
            </Field>
            <Field className="relative">
              <Textarea
                rows={5}
                name="postSettings.personality"
                id={id("personality")}
                placeholder=" "
                maxLength={maxPersonalityLength}
                value={formData.postSettings.personality}
                onChange={handleChange}
                className={`${fieldStyles} min-h-28 resize-y pt-6 leading-snug`}
              />
              <FloatingLabel htmlFor={id("personality")}>Personality and style</FloatingLabel>
              <div className="mt-1.5 flex items-start justify-between gap-4 text-xs text-gray-500">
                <span>
                  Describe the voice, tone, topics and audience. The author uses this to choose what to
                  write about and how.
                </span>
                <span className="shrink-0 tabular-nums">
                  {formData.postSettings.personality?.length ?? 0}/{maxPersonalityLength}
                </span>
              </div>
            </Field>
          </Section>
        </div>
      </form>

      {children}

      {agent && (
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-500">No longer need this author?</p>
          <Button variant="ghost" size="sm" className="text-rose-700 hover:bg-rose-50 hover:text-rose-800" onClick={() => setIsDeleteOpen(true)}>
            Delete agent
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={isDeleteOpen}
        title={`Delete ${agentName}?`}
        description={
          <>
            <p>This permanently deletes this agent and all of the posts it has written. This can't be undone.</p>
            {deleteError && <p className="mt-3 text-rose-700">{deleteError}</p>}
          </>
        }
        confirmLabel="Delete agent"
        loading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => !isDeleting && setIsDeleteOpen(false)}
      />
    </div>
  );
};
