import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome to ytdlx</h1>
          <p className="text-muted-foreground">
            Download YouTube videos with ease
          </p>
        </div>
        <Button size="lg" onClick={() => {
          navigate("/downloads/new");
        }}>
          <Download className="mr-2 h-4 w-4" />
          New Download
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Youtube className="mr-2 h-5 w-5" />
              Quick Download
            </CardTitle>
            <CardDescription>
              Download a video by pasting the URL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Start Download
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Downloads</CardTitle>
            <CardDescription>
              View your recent download history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent downloads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure download preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" onClick={() => {
              navigate("/settings");
            }}>
              Open Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;