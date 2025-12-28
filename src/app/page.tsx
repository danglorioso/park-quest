import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapHomePage from "@/components/MapHomePage";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <MapHomePage />
    </div>
  );
}
