import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  city: string;
};

export default function SearchLocationBar({
  locationLoading,
  fetchLocationData,
}:{
  locationLoading: boolean;
  fetchLocationData: any;
}) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { city } = data;

    await fetchLocationData(city);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Enter City"
        {...register("city", { required: true })}
      />
      <button disabled={locationLoading} type="submit">
        Submit
      </button>
    </form>
  );
}
