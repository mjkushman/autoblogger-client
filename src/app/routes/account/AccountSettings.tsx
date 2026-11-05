import { Account } from "@/types";
import React, { useContext, useState } from "react";
import api from "@/utils/api";
import { useNavigate } from "react-router";

import { AuthService } from "@/utils/authService";
import UserContext from "@/app/contexts/UserContext";
import { Description, Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import { AccountFormData } from "@/types/Account.type";
import { Button, ConfirmDialog, InfoTip, LabeledInput, SaveStatus, Tooltip } from "@/components";
import { useSaveStatus } from "@/app/hooks/useSaveStatus";

type Props = {
  account: Account;
  updateAccount: (formData: AccountFormData) => Promise<void>;
};

export const AccountSettings = ({ account, updateAccount }: Props) => {
  const [isApiKeyVisibile, setIsApiKeyVisibile] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { setToken } = useContext(UserContext);
  const { isSaving, isSaved, error, run } = useSaveStatus();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await api.delete("accounts");
      AuthService.logout();
      setToken(null);
      navigate("/");
    } catch {
      setDeleteError("We couldn't delete your account. Please try again.");
      setIsDeleting(false);
    }
  };

  const initialAccountFormData: AccountFormData = {
    accountId: account.accountId,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
  };

  const [accountFormData, setAccountFormData] = useState(initialAccountFormData);

  const isDataChanged =
    JSON.stringify(accountFormData) !== JSON.stringify(initialAccountFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAccountFormData((accountFormData) => ({ ...accountFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await run(
      () => updateAccount(accountFormData),
      "We couldn't save your changes. Please try again."
    );
  };

  const copyApiKey = async () => {
    await navigator.clipboard.writeText(account.apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <form onSubmit={handleSubmit} className="px-6 py-6">
        <Fieldset>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Legend className="text-sm font-semibold text-gray-900">Your details</Legend>
            <div className="flex items-center gap-3">
              <SaveStatus isSaving={isSaving} isSaved={isSaved} error={error} />
              <Button type="submit" disabled={!isDataChanged} loading={isSaving}>
                Save changes
              </Button>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Field className="relative">
              <LabeledInput
                name="firstName"
                id="firstName"
                label="First name"
                type="text"
                value={accountFormData.firstName}
                onChange={handleChange}
              />
            </Field>
            <Field className="relative">
              <LabeledInput
                name="lastName"
                id="lastName"
                type="text"
                label="Last name"
                value={accountFormData.lastName}
                onChange={handleChange}
              />
            </Field>
            <Field className="relative">
              <LabeledInput
                name="email"
                id="email"
                type="email"
                label="Email"
                value={accountFormData.email}
                onChange={handleChange}
              />
            </Field>
          </div>
        </Fieldset>
      </form>

      <div className="border-t border-gray-100 px-6 py-6">
        <Field>
          <div className="flex items-center gap-1.5">
            <Label className="text-sm font-semibold text-gray-900">Your Autoblogger API key</Label>
            <InfoTip label="Send this key in the x-api-key header when your website requests its posts from the Autoblogger API." />
          </div>
          <Description className="mt-1 text-sm text-gray-500">
            Keep this secret. Anyone with it can read your posts and use your account.
          </Description>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Input
              name="apiKey"
              id="apiKey"
              type={isApiKeyVisibile ? "text" : "password"}
              value={account.apiKey}
              readOnly
              onFocus={(e) => e.currentTarget.select()}
              className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 font-mono text-sm text-gray-700 transition hover:border-gray-400 focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-100"
            />
            <Button variant="secondary" aria-pressed={isApiKeyVisibile} onClick={() => setIsApiKeyVisibile(!isApiKeyVisibile)}>
              {isApiKeyVisibile ? "Hide" : "Show"}
            </Button>
            <Tooltip label={isCopied ? "Copied!" : "Copy API key"}>
              <Button variant="secondary" onClick={copyApiKey} aria-label="Copy API key">
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </Tooltip>
          </div>
        </Field>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-6 py-4">
        <p className="text-sm text-gray-500">Done with Autoblogger?</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-rose-700 hover:bg-rose-50 hover:text-rose-800"
          onClick={() => setIsDeleteOpen(true)}
        >
          Delete account
        </Button>
      </div>

      <ConfirmDialog
        open={isDeleteOpen}
        title="Delete your account?"
        description={
          <>
            <p>
              This permanently deletes your account, your agents, all of their posts and any comments
              on those posts. This can't be undone.
            </p>
            {deleteError && <p className="mt-3 text-rose-700">{deleteError}</p>}
          </>
        }
        confirmLabel="Delete my account"
        loading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => !isDeleting && setIsDeleteOpen(false)}
      />
    </div>
  );
};
