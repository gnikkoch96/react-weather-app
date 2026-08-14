import { useForm, type SubmitHandler } from "react-hook-form";
import { Search } from "lucide-react";

type Inputs = {
  city: string;
};

export default function SearchLocationBar({
  locationLoading,
  fetchLocationData,
}: {
  locationLoading: boolean;
  fetchLocationData: any;
}) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { city } = data;

    // todo catch empty input
    await fetchLocationData(city);
  };

  return (
    <form className='relative' onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Enter City"
        className="bg-white border rounded-2xl p-1.5 pr-9 shadow"
        {...register("city", { required: true })}
      />
      <button className='absolute p-0.5 rounded-2xl bg-primary text-white right-1.5 top-2 hover:cursor-pointer transition duration-100 ease-in ' disabled={locationLoading} type="submit">
        <Search size={20}/>
      </button>
    </form>
  );
}
