interface Props {
  notice: string;
}

const Notification = ({ notice }: Props) => {
  return <p>{notice}</p>;
};

export default Notification;
