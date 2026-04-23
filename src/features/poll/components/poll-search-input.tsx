import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";

interface PollSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  sortedAndFilteredPollsLength?: number;
}

const PollSearchInput = ({ value, onChange, sortedAndFilteredPollsLength }: PollSearchInputProps) => {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Tìm kiếm..." value={value} onChange={(e) => onChange(e.target.value)} />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">{sortedAndFilteredPollsLength} Kết quả</InputGroupAddon>
    </InputGroup>
  );
};

export default PollSearchInput;
