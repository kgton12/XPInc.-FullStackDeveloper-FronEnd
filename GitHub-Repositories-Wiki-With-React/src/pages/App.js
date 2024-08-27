import gitLogo from "../assets/github.png";
import { Container } from "./styles";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import Button from "../components/Button";
import { api } from "../services/api";
import { useState } from "react";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}/repos`);

    if (data.id) {
      const repoAlreadyExists = repos.find((repo) => repo.id === data.id);

      if (!repoAlreadyExists) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo("");
        return;
      }
    }
    alert("Repositório não encontrado");
  };

  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter((repo) => repo.id !== id);
    setRepos(newRepos);
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Github logo" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />
      ))}
    </Container>
  );
}

export default App;
