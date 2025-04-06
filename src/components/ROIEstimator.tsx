
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const ROIEstimator = () => {
  const [plotSize, setPlotSize] = useState<number>(150);
  const [pricePerSqYd, setPricePerSqYd] = useState<number>(140000);
  const [appreciation, setAppreciation] = useState<number>(12);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalROI, setTotalROI] = useState<number>(0);
  
  useEffect(() => {
    calculateROI();
  }, [plotSize, pricePerSqYd, appreciation, holdingPeriod]);
  
  const calculateROI = () => {
    const initialInvestment = plotSize * pricePerSqYd;
    const futureVal = initialInvestment * Math.pow((1 + appreciation / 100), holdingPeriod);
    const roi = ((futureVal - initialInvestment) / initialInvestment) * 100;
    
    setFutureValue(Math.round(futureVal));
    setTotalROI(Math.round(roi));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-estate-primary/5 pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calculator className="text-estate-secondary" />
          Investment ROI Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="plotSize" className="text-sm font-medium">
              Plot Size (Sq Yd)
            </Label>
            <span className="text-sm font-semibold text-estate-primary">{plotSize} sq.yd</span>
          </div>
          <Slider
            id="plotSize"
            min={150}
            max={300}
            step={10}
            value={[plotSize]}
            onValueChange={(values) => setPlotSize(values[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>150 sq.yd</span>
            <span>300 sq.yd</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="pricePerSqYd" className="text-sm font-medium">
              Price per Sq Yd (₹)
            </Label>
            <span className="text-sm font-semibold text-estate-primary">₹{pricePerSqYd.toLocaleString()}</span>
          </div>
          <Slider
            id="pricePerSqYd"
            min={130000}
            max={150000}
            step={1000}
            value={[pricePerSqYd]}
            onValueChange={(values) => setPricePerSqYd(values[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1.3L</span>
            <span>₹1.5L</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="appreciation" className="text-sm font-medium">
              Est. Annual Appreciation (%)
            </Label>
            <span className="text-sm font-semibold text-estate-primary">{appreciation}%</span>
          </div>
          <Slider
            id="appreciation"
            min={5}
            max={20}
            step={1}
            value={[appreciation]}
            onValueChange={(values) => setAppreciation(values[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>20%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="holdingPeriod" className="text-sm font-medium">
              Holding Period (Years)
            </Label>
            <span className="text-sm font-semibold text-estate-primary">{holdingPeriod} years</span>
          </div>
          <Slider
            id="holdingPeriod"
            min={1}
            max={10}
            step={1}
            value={[holdingPeriod]}
            onValueChange={(values) => setHoldingPeriod(values[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 year</span>
            <span>10 years</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-estate-primary/5 p-3 rounded-md">
            <p className="text-sm text-muted-foreground mb-1">Estimated Future Value</p>
            <p className="text-xl font-bold text-estate-secondary">₹{futureValue.toLocaleString()}</p>
          </div>
          <div className="bg-estate-secondary/10 p-3 rounded-md">
            <p className="text-sm text-muted-foreground mb-1">Total ROI</p>
            <p className="text-xl font-bold text-estate-secondary">{totalROI}%</p>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          *This is an estimation tool. Actual returns may vary based on market conditions. 
          Not a guarantee of investment performance.
        </p>
      </CardContent>
    </Card>
  );
};

export default ROIEstimator;
