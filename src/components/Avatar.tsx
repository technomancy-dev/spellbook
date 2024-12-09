import { pb } from "@/pb-instance";

const Avatar = ({ user }) => {
  const img = pb.files.getUrl(user, user.avatar);

  if (!img)
    return (
      <div class="h-12 capitalize bg-base-200 flex justify-center items-center font-black">
        {user.username.slice(0, 1)}
      </div>
    );
  return <img width={12} src={img} alt="Avatar Tailwind CSS Component" />;
};

export default Avatar;
