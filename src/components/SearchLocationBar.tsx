import { useForm, type SubmitHandler } from "react-hook-form";
import { Search } from "lucide-react";

type Inputs = {
  city: string;
};

type SearchLocationBarProps = {
  locationLoading: boolean;
  fetchLocationData: (city: string) => void;
};

export default function SearchLocationBar({
  locationLoading,
  fetchLocationData,
}: SearchLocationBarProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { city } = data;
    fetchLocationData(city);
  };

  return (
    <form className="min-w-md relative" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Enter City"
        className="min-w-full bg-white border rounded-2xl p-1.5 pr-9 shadow"
        {...register("city", { required: "Please enter a city" })}
      />
      <button
        className="absolute p-0.5 rounded-2xl bg-primary text-white right-1.5 top-2 hover:cursor-pointer transition duration-100 ease-in "
        disabled={locationLoading}
        type="submit"
      >
        <Search size={20} />
      </button>
      {errors.city && <p className='text-white ml-1.5'>{errors.city.message}</p>}
    </form>
  );
}
