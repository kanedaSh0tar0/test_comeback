import React, { useState } from "react";
import { TextField, Button, Stack, CircularProgress } from "@mui/material";

function AddCity({
  onAdd,
  loading,
}: {
  onAdd: (city: string) => void;
  loading: boolean;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    onAdd(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Add city"
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!value.trim() || loading}
        >
          {loading ? <CircularProgress size={16} /> : "Add"}
        </Button>
      </Stack>
    </form>
  );
}

export default AddCity;
