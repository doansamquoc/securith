import CopyButton from "@/components/copy-button";
import ShareButton from "@/components/share-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandReddit, IconBrandWhatsapp, IconBrandX, IconQrcode } from "@tabler/icons-react";

const ShareCard = () => {
  const pollUrl = window.location.href;
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Chia sẻ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 md:px-6">
        <InputGroup>
          <InputGroupInput value={pollUrl} readOnly />
          <InputGroupButton asChild>
            <CopyButton textToCopy={pollUrl} variant={"ghost"} size={"sm"}></CopyButton>
          </InputGroupButton>
        </InputGroup>
        <div className="grid grid-cols-6 md:grid-cols-3 gap-2">
          <ShareButton icon={<IconBrandFacebook />} label="Facebook" onClick={() => alert("Facebook")} />
          <ShareButton icon={<IconBrandLinkedin />} label="LinkedIn" onClick={() => alert("LinkedIn")} />
          <ShareButton icon={<IconBrandWhatsapp />} label="WhatsApp" onClick={() => alert("WhatsApp")} />
          <ShareButton icon={<IconBrandX />} label="X" onClick={() => alert("X")} />
          <ShareButton icon={<IconBrandReddit />} label="Reddit" onClick={() => alert("Reddit")} />
          <ShareButton icon={<IconQrcode />} label="QR Code" onClick={() => alert("QR Code")} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareCard;
