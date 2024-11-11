import { PuffLoader } from "react-spinners";

type Props = {
  color?: string;
  size?: number;
  loading?: boolean;
};

export const Loading = ({
  color = "#490f47",
  size = 150,
  loading = true,
}: Props) => {
  return <PuffLoader color={color} size={size} loading={loading} />;
};
