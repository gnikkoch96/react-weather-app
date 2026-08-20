import { useForm, type SubmitHandler } from "react-hook-form";
import { Search, LoaderCircle } from "lucide-react";

type Inputs = {
  city: string;
};

type SearchLocationBarProps = {
  locationLoading: boolean;
  locationError: string | null;
  onSearch: (city: string) => void;
};

/*
  Responsibility:
  1. Manager and render the location search form
  2. Trigger location search
*/
export default function SearchLocationBar({
  locationLoading,
  locationError,
  onSearch,
}: SearchLocationBarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { city } = data;
    onSearch(city);
  };

  return (
    <form className="min-w-md relative" onSubmit={handleSubmit(onSubmit)}>
      <label className="sr-only" htmlFor="city">
        Enter City:
      </label>
      <input
        id='city'
        type="text"
        placeholder="Enter City"
        className="min-w-full bg-white border rounded-2xl p-1.5 pr-9 shadow"
        {...register("city", { required: "Please enter a city" })}
      />
      <button
        className="flex justify-center items-center absolute p-0.5 rounded-2xl bg-primary text-white right-1.5 top-2 hover:cursor-pointer transition duration-100 ease-in "
        disabled={locationLoading}
        type="submit"
      >
        {locationLoading ? <LoaderCircle className='animate-spin' size={20} /> : <Search size={20} />}
      </button>

      {errors.city && (
        <p className="text-white ml-1.5">{errors.city.message}</p>
      )}
      {locationError && <p className="text-white ml-1.5">{locationError}</p>}
    </form>
  );
}
