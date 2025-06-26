
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('en');

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-24 h-9">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिंदी</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
