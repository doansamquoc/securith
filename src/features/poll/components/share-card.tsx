import CopyButton from "@/components/copy-button";
import ShareButton from "@/components/share-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandReddit, IconBrandWhatsapp, IconBrandX, IconQrcode } from "@tabler/icons-react";

const ShareCard = () => {
  const pollUrl = window.location.href;
  const encodedUrl = encodeURIComponent(pollUrl);
  
  const handleShare = (platform: string) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodedUrl}`;
        break;
      case "qrcode":
        alert("Tính năng tạo QR Code sẽ được cập nhật sau.");
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

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
          <ShareButton icon={<IconBrandFacebook />} label="Facebook" onClick={() => handleShare("facebook")} />
          <ShareButton icon={<IconBrandLinkedin />} label="LinkedIn" onClick={() => handleShare("linkedin")} />
          <ShareButton icon={<IconBrandWhatsapp />} label="WhatsApp" onClick={() => handleShare("whatsapp")} />
          <ShareButton icon={<IconBrandX />} label="X" onClick={() => handleShare("x")} />
          <ShareButton icon={<IconBrandReddit />} label="Reddit" onClick={() => handleShare("reddit")} />
          <ShareButton icon={<IconQrcode />} label="QR Code" onClick={() => handleShare("qrcode")} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareCard;
