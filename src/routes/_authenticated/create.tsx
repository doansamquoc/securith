import { createFileRoute } from "@tanstack/react-router";
import { CreatePollForm } from "@/features/polls/components/create-poll-form";

export const Route = createFileRoute("/_authenticated/create")({
  component: CreatePollPageComponent,
});

function CreatePollPageComponent() {
  return (
    <div className="container mx-auto px-4">
      <CreatePollForm />
    </div>
  );
}