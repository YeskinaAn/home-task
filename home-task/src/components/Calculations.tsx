import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import {
  descriptionError,
  entryFeeError,
  numberOfPlayersError,
  titleError,
} from "../helpers/constants";
import Navbar from "./Navbar";
import { Prize, Tournament } from "../types/tournamentTypes";

const TournamentForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      numberOfPlayers: 0,
      entryFee: 0,
      prizeDistribution: [{ place: 0, prize: 0 }],
    },
  });

  const entryFee = watch("entryFee");
  const numberOfPlayers = watch("numberOfPlayers");
  const totalPrizePool = entryFee * numberOfPlayers;

  const calculateRemainingPrizePool = () => {
    const prizeDistribution = watch("prizeDistribution", []);
    let distributedPrizes = 0;

    for (const prize of prizeDistribution) {
      const prizeValue = prize.prize.toString(); // Convert to string
      if (prizeValue.includes("%")) {
        const percentage = parseFloat(prizeValue) / 100; // Parse as float
        distributedPrizes += totalPrizePool * percentage;
      } else {
        distributedPrizes += parseFloat(prizeValue); // Parse as float
      }
    }

    return totalPrizePool - distributedPrizes || 0;
  };

  const generateDefaultPrizeDistribution = (
    numberOfPlayers: number
  ): Prize[] => {
    return Array.from({ length: numberOfPlayers }, () => ({
      place: 0,
      prize: 0,
    }));
  };

  const onSubmit = (data: Tournament) => {
    const prizes = data.prizeDistribution.map((prize) => prize.prize);
    const totalPrizePool = prizes.reduce(
      (total, prize) => Number(total) + Number(prize),
      0
    );
    const storedData = localStorage.getItem("tournamentData");
    const existingData = storedData ? JSON.parse(storedData) : [];

    const updatedData = [
      ...existingData,
      {
        ...data,
        id: existingData.length + 1,
        totalPrizePool: totalPrizePool,
        numberOfWinners: data.prizeDistribution.length,
      },
    ];

    localStorage.setItem("tournamentData", JSON.stringify(updatedData));
    reset();
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: titleError,
                  minLength: {
                    value: 5,
                    message: titleError,
                  },
                  maxLength: {
                    value: 50,
                    message: titleError,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Title"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: descriptionError,
                  minLength: {
                    value: 10,
                    message: descriptionError,
                  },
                  maxLength: {
                    value: 100,
                    message: descriptionError,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Description"
                    fullWidth
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="numberOfPlayers"
                control={control}
                rules={{
                  required: numberOfPlayersError,
                  min: {
                    value: 2,
                    message: numberOfPlayersError,
                  },
                  max: {
                    value: 100,
                    message: numberOfPlayersError,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="Number of Players"
                    fullWidth
                    error={Boolean(errors?.numberOfPlayers)}
                    helperText={errors?.numberOfPlayers?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="entryFee"
                control={control}
                rules={{
                  required: entryFeeError,
                  min: {
                    value: 0,
                    message: entryFeeError,
                  },
                  max: {
                    value: 1000,
                    message: entryFeeError,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="Entry Fee"
                    fullWidth
                    error={Boolean(errors.entryFee)}
                    helperText={errors.entryFee?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Prize Pool: {totalPrizePool} cents</Typography>
              <Typography>
                Remaining Prize Pool: {calculateRemainingPrizePool()} cents
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="prizeDistribution"
                control={control}
                defaultValue={generateDefaultPrizeDistribution(
                  watch("numberOfPlayers", 0)
                )}
                render={({ field }) => (
                  <>
                    {field.value.map((prize: Prize, index: number) => (
                      <Grid mt={1} container spacing={2} key={index}>
                        <Grid item xs={6}>
                          <Controller
                            name={`prizeDistribution.${index}.place`}
                            control={control}
                            rules={{ required: "Place is required" }}
                            render={({ field }) => (
                              <TextField
                                label="Place"
                                error={Boolean(
                                  errors?.prizeDistribution?.[index]?.place
                                )}
                                helperText={
                                  errors?.prizeDistribution?.[index]?.place
                                    ?.message
                                }
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name={`prizeDistribution.${index}.prize`}
                            control={control}
                            rules={{ required: "Prize is required", min: 0 }}
                            render={({ field }) => (
                              <TextField
                                type="text"
                                label="Prize"
                                error={Boolean(
                                  errors?.prizeDistribution?.[index]?.prize
                                )}
                                helperText={
                                  errors?.prizeDistribution?.[index]?.prize
                                    ?.message
                                }
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid mt={3} item xs={2}>
                          {index > 0 && (
                            <IconButton
                              aria-label="Remove Prize"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((_, i) => i !== index)
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                    {field.value.length < watch("numberOfPlayers", 0) && ( // Render the "Add Prize" button conditionally
                      <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => {
                          field.onChange([
                            ...field.value,
                            { place: 0, prize: 0 },
                          ]);
                          trigger("prizeDistribution");
                        }}
                      >
                        Add Prize
                      </Button>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Create Tournament
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default TournamentForm;
