import Button from "@/components/MUIComponents/Button";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import HomeIcon from "@mui/icons-material/Home";

const Home = () => {
  return (
    <div>
      <PageHeader
        header="Добре дошли!"
        subheader="Управлявайте ежедневните си задачи със стил!"
        icon={<HomeIcon sx={{ fontSize: "2.5rem" }} />}
        action={<Button message="test" />}
      />
      Home
    </div>
  );
};

export default Home;
